<?php
function renderNav($currentPage = '')
{
    ?>
    <nav class="bg-white shadow-lg mb-8">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <span class="text-xl font-semibold text-gray-800">Admin Dashboard</span>
                </div>
                <div class="flex items-center space-x-6">
                    <!-- Navigation Links -->
                    <div class="flex items-center space-x-6 mr-4">
                        <a href="dashboard.php"
                            class="<?php echo $currentPage === 'projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'; ?> transition-all py-5">
                            <i class="fas fa-project-diagram mr-2"></i>
                            Projects
                        </a>
                        <a href="clients.php"
                            class="<?php echo $currentPage === 'clients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'; ?> transition-all py-5">
                            <i class="fas fa-building mr-2"></i>
                            Clients
                        </a>
                        <a href="blog.php"
                            class="<?php echo $currentPage === 'blog' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'; ?> transition-all py-5">
                            <i class="fas fa-blog mr-2"></i>
                            Blog
                        </a>
                    </div>
                    <!-- Logout Button -->
                    <a href="logout.php"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
                        <i class="fas fa-sign-out-alt mr-2"></i>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <?php
}
?>