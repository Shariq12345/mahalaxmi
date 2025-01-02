<?php
session_start();
require_once('../config/database.php');
require_once('./components/nav.php');

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

// Handle client submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["name"]) && isset($_FILES["logo"])) {
        try {
            $target_dir = "../uploads/clients/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }

            $file_extension = strtolower(pathinfo($_FILES["logo"]["name"], PATHINFO_EXTENSION));
            $file_name = uniqid() . "." . $file_extension;
            $target_file = $target_dir . $file_name;

            if (move_uploaded_file($_FILES["logo"]["tmp_name"], $target_file)) {
                $stmt = $pdo->prepare("
                    INSERT INTO clients (name, logo_path, description, website_url, category) 
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $_POST["name"],
                    $file_name,
                    $_POST["description"],
                    $_POST["website_url"],
                    $_POST["category"]
                ]);
                $success = "Client added successfully!";
            }
        } catch (Exception $e) {
            $error = "Error: " . $e->getMessage();
        }
    }
}

// Delete client
if (isset($_GET['delete'])) {
    try {
        // Get client logo
        $stmt = $pdo->prepare("SELECT logo_path FROM clients WHERE id = ?");
        $stmt->execute([$_GET['delete']]);
        $client = $stmt->fetch();

        // Delete logo file
        if ($client && $client['logo_path']) {
            $logo_path = "../uploads/clients/" . $client['logo_path'];
            if (file_exists($logo_path)) {
                unlink($logo_path);
            }
        }

        // Delete client from database
        $stmt = $pdo->prepare("DELETE FROM clients WHERE id = ?");
        $stmt->execute([$_GET['delete']]);

        header("Location: clients.php");
        exit();
    } catch (Exception $e) {
        $error = "Error: " . $e->getMessage();
    }
}

// Fetch all clients
$clients = $pdo->query("SELECT * FROM clients ORDER BY created_at DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients Management - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body class="bg-gray-50 min-h-screen">
    <?php renderNav('clients'); ?>

    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Alerts -->
        <?php if (isset($success)): ?>
            <div class="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <span class="block sm:inline"><?php echo $success; ?></span>
            </div>
        <?php endif; ?>

        <?php if (isset($error)): ?>
            <div class="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span class="block sm:inline"><?php echo $error; ?></span>
            </div>
        <?php endif; ?>

        <!-- Add Client Form -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-plus-circle mr-2"></i>Add New Client
            </h2>
            <form method="POST" enctype="multipart/form-data" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Client Name
                        </label>
                        <input type="text" name="name" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <input type="text" name="category"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea name="description" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Website URL
                        </label>
                        <input type="url" name="website_url"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Client Logo
                        </label>
                        <input type="file" name="logo" accept="image/*" required class="w-full">
                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <i class="fas fa-save mr-2"></i> Save Client
                    </button>
                </div>
            </form>
        </div>

        <!-- Clients List -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
                <i class="fas fa-building mr-2"></i>Existing Clients
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($clients as $client): ?>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                        <div class="p-4">
                            <div class="aspect-w-16 aspect-h-9 mb-4">
                                <img src="../uploads/clients/<?php echo htmlspecialchars($client['logo_path']); ?>"
                                    alt="<?php echo htmlspecialchars($client['name']); ?>"
                                    class="w-full h-32 object-contain">
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                <?php echo htmlspecialchars($client['name']); ?>
                            </h3>
                            <?php if ($client['category']): ?>
                                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-2">
                                    <?php echo htmlspecialchars($client['category']); ?>
                                </span>
                            <?php endif; ?>
                            <p class="text-gray-600 text-sm mb-4">
                                <?php echo htmlspecialchars($client['description']); ?>
                            </p>
                            <div class="flex justify-between items-center">
                                <?php if ($client['website_url']): ?>
                                    <a href="<?php echo htmlspecialchars($client['website_url']); ?>" target="_blank"
                                        class="text-blue-600 hover:text-blue-800 text-sm">
                                        Visit Website
                                    </a>
                                <?php endif; ?>
                                <a href="?delete=<?php echo $client['id']; ?>"
                                    onclick="return confirm('Are you sure you want to delete this client?')"
                                    class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</body>

</html>