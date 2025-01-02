<?php
session_start();
require_once('../config/database.php');
require_once('./components/nav.php');

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

// Handle blog post submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["title"]) && isset($_POST["content"])) {
        try {
            $target_dir = "../uploads/blog/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }

            // Handle thumbnail upload
            $thumbnail_path = "";
            if (isset($_FILES["thumbnail"])) {
                $file_extension = strtolower(pathinfo($_FILES["thumbnail"]["name"], PATHINFO_EXTENSION));
                $file_name = uniqid() . "." . $file_extension;
                $target_file = $target_dir . $file_name;

                if (move_uploaded_file($_FILES["thumbnail"]["tmp_name"], $target_file)) {
                    $thumbnail_path = $file_name;
                }
            }

            // Create slug from title
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $_POST["title"])));

            // Insert blog post
            $stmt = $pdo->prepare("
                INSERT INTO blog_posts (title, slug, content, thumbnail, excerpt, author, read_time) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST["title"],
                $slug,
                $_POST["content"],
                $thumbnail_path,
                $_POST["excerpt"],
                $_POST["author"],
                $_POST["read_time"] ?? null
            ]);

            $success = "Blog post published successfully!";
        } catch (Exception $e) {
            $error = "Error: " . $e->getMessage();
        }
    }
}

// Delete blog post
if (isset($_GET['delete'])) {
    try {
        // Get post thumbnail
        $stmt = $pdo->prepare("SELECT thumbnail FROM blog_posts WHERE id = ?");
        $stmt->execute([$_GET['delete']]);
        $post = $stmt->fetch();

        // Delete thumbnail file
        if ($post && $post['thumbnail']) {
            $thumbnail_path = "../uploads/blog/" . $post['thumbnail'];
            if (file_exists($thumbnail_path)) {
                unlink($thumbnail_path);
            }
        }

        // Delete post from database
        $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
        $stmt->execute([$_GET['delete']]);

        header("Location: blog.php");
        exit();
    } catch (Exception $e) {
        $error = "Error: " . $e->getMessage();
    }
}

// Fetch all blog posts
$posts = $pdo->query("SELECT * FROM blog_posts ORDER BY published_at DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Management - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Add TinyMCE for rich text editing -->
    <script
        src="https://cdn.tiny.cloud/1/77amygb0qz6cjkkquds5jvw66qhng5y7yv09r92ys4pr2kiz/tinymce/6/tinymce.min.js"></script>
    <script>
        tinymce.init({
            selector: '#content',
            plugins: 'link image code',
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | link image | code'
        });
    </script>
</head>

<body class="bg-gray-50 min-h-screen">
    <?php renderNav('blog'); ?>

    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Add Blog Post Form -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-edit mr-2"></i>Add New Blog Post
            </h2>
            <form method="POST" enctype="multipart/form-data" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input type="text" name="title" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Author
                        </label>
                        <input type="text" name="author"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt (Short Description)
                    </label>
                    <textarea name="excerpt" rows="2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <textarea id="content" name="content" rows="10"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Image
                        </label>
                        <input type="file" name="thumbnail" accept="image/*" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Read Time (minutes)
                        </label>
                        <input type="number" name="read_time" min="1" value="5"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <i class="fas fa-paper-plane mr-2"></i>
                        Publish Post
                    </button>
                </div>
            </form>
        </div>

        <!-- Blog Posts List -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-blog mr-2"></i>Published Posts
            </h2>
            <div class="grid grid-cols-1 gap-6">
                <?php foreach ($posts as $post): ?>
                    <div class="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                        <img src="../uploads/blog/<?php echo htmlspecialchars($post['thumbnail']); ?>"
                            alt="<?php echo htmlspecialchars($post['title']); ?>" class="w-32 h-24 object-cover rounded-lg">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">
                                <?php echo htmlspecialchars($post['title']); ?>
                            </h3>
                            <p class="text-sm text-gray-600 mb-2">
                                <?php echo htmlspecialchars($post['excerpt']); ?>
                            </p>
                            <div class="flex items-center gap-4 text-sm text-gray-500">
                                <span>
                                    <i class="fas fa-user mr-1"></i>
                                    <?php echo htmlspecialchars($post['author']); ?>
                                </span>
                                <span>
                                    <i class="fas fa-clock mr-1"></i>
                                    <?php echo $post['read_time']; ?> min read
                                </span>
                                <span>
                                    <i class="fas fa-calendar mr-1"></i>
                                    <?php echo date('M d, Y', strtotime($post['published_at'])); ?>
                                </span>
                            </div>
                        </div>
                        <a href="?delete=<?php echo $post['id']; ?>"
                            onclick="return confirm('Are you sure you want to delete this post?')"
                            class="text-red-600 hover:text-red-800 p-2">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</body>

</html>