<?php
session_start();
require_once('../config/database.php');
require_once('./components/nav.php');

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

// Fetch categories for the dropdown
$categories = $pdo->query("SELECT * FROM categories ORDER BY name ASC")->fetchAll();

// Handle project submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["title"]) && isset($_POST["description"]) && isset($_POST["category_id"])) {
        try {
            $pdo->beginTransaction();

            // Handle thumbnail
            $thumbnail = $_FILES["thumbnail"];
            $thumbnail_path = handleImageUpload($thumbnail);

            // Insert project
            $stmt = $pdo->prepare("
                INSERT INTO projects (title, description, thumbnail, category_id) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST["title"],
                $_POST["description"],
                $thumbnail_path,
                $_POST["category_id"]
            ]);

            $project_id = $pdo->lastInsertId();

            // Handle additional images
            if (isset($_FILES["images"])) {
                $images = reArrayFiles($_FILES["images"]);
                foreach ($images as $index => $image) {
                    $image_path = handleImageUpload($image);
                    $stmt = $pdo->prepare("
                        INSERT INTO project_images (project_id, image_path, display_order) 
                        VALUES (?, ?, ?)
                    ");
                    $stmt->execute([$project_id, $image_path, $index]);
                }
            }

            $pdo->commit();
            $success = "Project added successfully!";
        } catch (Exception $e) {
            $pdo->rollBack();
            $error = "Error: " . $e->getMessage();
        }
    }
}

// Delete project
if (isset($_GET['delete'])) {
    try {
        $pdo->beginTransaction();

        // Get project images
        $stmt = $pdo->prepare("
            SELECT p.thumbnail, pi.image_path 
            FROM projects p 
            LEFT JOIN project_images pi ON p.id = pi.project_id 
            WHERE p.id = ?
        ");
        $stmt->execute([$_GET['delete']]);
        $images = $stmt->fetchAll();

        // Delete physical files
        foreach ($images as $image) {
            if ($image['thumbnail'])
                deleteImage($image['thumbnail']);
            if ($image['image_path'])
                deleteImage($image['image_path']);
        }

        // Delete project (will cascade delete project_images)
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$_GET['delete']]);

        $pdo->commit();
        header("Location: dashboard.php");
        exit();
    } catch (Exception $e) {
        $pdo->rollBack();
        $error = "Error: " . $e->getMessage();
    }
}

// Fetch all projects with their images
$stmt = $pdo->query("
    SELECT 
        p.*,
        c.name as category_name,
        GROUP_CONCAT(pi.image_path) as additional_images
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN project_images pi ON p.id = pi.project_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
");
$projects = $stmt->fetchAll();

// Helper functions
function handleImageUpload($file)
{
    $target_dir = "../uploads/projects/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
    $file_name = uniqid() . "." . $file_extension;
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        return $file_name;
    }
    throw new Exception("Failed to upload image.");
}

function deleteImage($image_path)
{
    $full_path = "../uploads/projects/" . $image_path;
    if (file_exists($full_path)) {
        unlink($full_path);
    }
}

function reArrayFiles($file_post)
{
    $file_array = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i = 0; $i < $file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_array[$i][$key] = $file_post[$key][$i];
        }
    }
    return $file_array;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects Management - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body class="bg-gray-50 min-h-screen">
    <?php renderNav('projects'); ?>

    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Alerts -->
        <?php if (isset($success)): ?>
            <div class="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline"><?php echo $success; ?></span>
            </div>
        <?php endif; ?>

        <?php if (isset($error)): ?>
            <div class="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline"><?php echo $error; ?></span>
            </div>
        <?php endif; ?>

        <!-- Add Project Form -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-plus-circle mr-2"></i>Add New Project
            </h2>
            <form method="POST" enctype="multipart/form-data" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="title">
                            Project Title
                        </label>
                        <input type="text" id="title" name="title" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="category_id">
                            Category
                        </label>
                        <select id="category_id" name="category_id" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            <?php foreach ($categories as $category): ?>
                                <option value="<?php echo htmlspecialchars($category['id']); ?>">
                                    <?php echo htmlspecialchars($category['name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" for="description">
                        Description
                    </label>
                    <textarea id="description" name="description" rows="4" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Image
                        </label>
                        <input type="file" name="thumbnail" accept="image/*" required class="w-full">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Additional Images
                        </label>
                        <input type="file" name="images[]" accept="image/*" multiple class="w-full">
                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <i class="fas fa-save mr-2"></i> Save Project
                    </button>
                </div>
            </form>
        </div>

        <!-- Projects List -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-project-diagram mr-2"></i>Existing Projects
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($projects as $project): ?>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="relative aspect-w-16 aspect-h-9">
                            <img src="../uploads/projects/<?php echo htmlspecialchars($project['thumbnail']); ?>"
                                alt="<?php echo htmlspecialchars($project['title']); ?>" class="w-full h-48 object-cover">
                            <div class="absolute top-2 right-2">
                                <span class="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                                    <?php echo htmlspecialchars($project['category_name'] ?? 'Uncategorized'); ?>
                                </span>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                <?php echo htmlspecialchars($project['title']); ?>
                            </h3>
                            <p class="text-gray-600 text-sm mb-4">
                                <?php echo htmlspecialchars(substr($project['description'], 0, 100)) . '...'; ?>
                            </p>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-500">
                                    <?php
                                    $additional_images = $project['additional_images'] ?
                                        count(explode(',', $project['additional_images'])) : 0;
                                    echo $additional_images . ' additional ' . ($additional_images === 1 ? 'image' : 'images');
                                    ?>
                                </span>
                                <div class="space-x-2">
                                    <button onclick="viewImages(<?php echo htmlspecialchars(json_encode([
                                        'thumbnail' => $project['thumbnail'],
                                        'additional' => $project['additional_images'] ? explode(',', $project['additional_images']) : []
                                    ])); ?>)"
                                        class="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                                        <i class="fas fa-images"></i>
                                    </button>
                                    <a href="?delete=<?php echo $project['id']; ?>"
                                        onclick="return confirm('Are you sure you want to delete this project?')"
                                        class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Image Viewer Modal -->
    <div id="imageModal" class="fixed inset-0 bg-black bg-opacity-75 hidden items-center justify-center z-50">
        <div class="max-w-4xl w-full mx-4">
            <div class="relative">
                <button onclick="closeModal()" class="absolute top-4 right-4 text-white hover:text-gray-300">
                    <i class="fas fa-times text-2xl"></i>
                </button>
                <div class="flex justify-center">
                    <img id="modalImage" src="" alt="Project Image" class="max-h-[80vh] object-contain">
                </div>
                <div class="absolute left-4 right-4 bottom-4 flex justify-between">
                    <button onclick="prevImage()" class="text-white hover:text-gray-300">
                        <i class="fas fa-chevron-left text-2xl"></i>
                    </button>
                    <button onclick="nextImage()" class="text-white hover:text-gray-300">
                        <i class="fas fa-chevron-right text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentImages = [];
        let currentImageIndex = 0;

        function viewImages(images) {
            currentImages = [images.thumbnail, ...images.additional];
            currentImageIndex = 0;
            updateModalImage();
            document.getElementById('imageModal').classList.remove('hidden');
            document.getElementById('imageModal').classList.add('flex');
        }

        function closeModal() {
            document.getElementById('imageModal').classList.add('hidden');
            document.getElementById('imageModal').classList.remove('flex');
        }

        function updateModalImage() {
            document.getElementById('modalImage').src = '../uploads/' + currentImages[currentImageIndex];
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            updateModalImage();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            updateModalImage();
        }

        // Close modal when clicking outside
        document.getElementById('imageModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (!document.getElementById('imageModal').classList.contains('hidden')) {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'Escape') closeModal();
            }
        });
    </script>
</body>

</html>