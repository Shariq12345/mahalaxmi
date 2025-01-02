<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../config/database.php');

try {
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
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transform image paths to full URLs
    foreach ($projects as &$project) {
        $project['thumbnail_url'] = 'http://localhost/mahalaxmi/app/backend/uploads/projects/' . $project['thumbnail'];
        $project['category'] = $project['category_name'];

        // Handle additional images
        $additional_images = $project['additional_images'] ? explode(',', $project['additional_images']) : [];
        $project['images'] = array_map(function ($image) {
            return 'http://localhost/mahalaxmi/app/backend/uploads/projects/' . $image;
        }, $additional_images);

        // Add thumbnail as first image
        array_unshift($project['images'], $project['thumbnail_url']);
    }

    echo json_encode(['success' => true, 'data' => $projects]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>