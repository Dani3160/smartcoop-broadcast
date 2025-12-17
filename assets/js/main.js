// Wait for DOM to be ready
$(document).ready(function () {

    // Initialize all components
    initSidebar();
    initDataTables();
    initSelect2();
    initApexCharts();
    initCalendar();
    initTabs();
    initNotifications();
    initNotificationDropdown();
    initDarkMode();
    initUserProfileDropdown();

    // Sidebar Toggle for Mobile
    function initSidebar() {
        $('#sidebar-toggle').on('click', function () {
            $('#sidebar').toggleClass('-translate-x-full');
        });

        // Close sidebar when clicking outside on mobile
        $(document).on('click', function (e) {
            if ($(window).width() < 1024) {
                if (!$(e.target).closest('#sidebar').length &&
                    !$(e.target).closest('#sidebar-toggle').length) {
                    $('#sidebar').addClass('-translate-x-full');
                }
            }
        });

        // Dropdown Menu Toggle
        $('.dropdown-toggle').on('click', function (e) {
            e.preventDefault();
            const dropdown = $(this).closest('.dropdown-menu');
            const dropdownContent = dropdown.find('.dropdown-content');
            const icon = $(this).find('.ri-arrow-down-s-line');

            // Close other dropdowns
            $('.dropdown-menu').not(dropdown).find('.dropdown-content').slideUp(200);
            $('.dropdown-menu').not(dropdown).find('.ri-arrow-down-s-line').removeClass('rotate-180');

            // Toggle current dropdown
            dropdownContent.slideToggle(200);
            icon.toggleClass('rotate-180');
        });

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.dropdown-menu').length) {
                $('.dropdown-content').slideUp(200);
                $('.ri-arrow-down-s-line').removeClass('rotate-180');
            }
        });

        // Set active menu item based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        $('#sidebar a[href="' + currentPage + '"]').addClass('bg-primary text-white').removeClass('text-gray-700 hover:bg-gray-100');
        $('#sidebar a[href="' + currentPage + '"]').closest('li').siblings().find('a').removeClass('bg-primary text-white');

        // Also handle sidebar-link class for pages that use it
        $('.sidebar-link').each(function () {
            if ($(this).attr('href') === currentPage) {
                $(this).addClass('bg-primary text-white').removeClass('text-gray-700 hover:bg-gray-100');
            }
        });
    }

    // Initialize DataTables
    function initDataTables() {
        // DataTables initialization removed for campaign table
        // Campaign table is now a simple static table with 5 items
    }

    // Initialize Select2
    function initSelect2() {
        // Single Select
        if ($('#select2-single').length) {
            $('#select2-single').select2({
                theme: 'bootstrap-5',
                placeholder: 'Choose an option',
                allowClear: true,
                width: '100%'
            });

            // Change event handlers
            $('#select2-single').on('change', function () {
                const value = $(this).val();
                if (value) {
                    toastr.success(`Selected: Option ${value}`);
                }
            });
        }

        // Multiple Select
        if ($('#select2-multiple').length) {
            $('#select2-multiple').select2({
                theme: 'bootstrap-5',
                placeholder: 'Select multiple options',
                allowClear: true,
                width: '100%'
            });

            $('#select2-multiple').on('change', function () {
                const values = $(this).val();
                if (values && values.length > 0) {
                    toastr.info(`Selected ${values.length} option(s)`);
                }
            });
        }
    }

    // Initialize ApexCharts
    function initApexCharts() {
        // Check if ApexCharts is available
        if (typeof ApexCharts === 'undefined') return;

        // Tickets Chart (Mini Line Chart)
        if (document.querySelector("#tickets-chart")) {
            const ticketsOptions = {
                series: [{
                    name: 'Tickets',
                    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 180, 215]
                }],
                chart: {
                    type: 'line',
                    height: 50,
                    sparkline: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                    colors: ['#10b981']
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#10b981'],
                        inverseColors: false,
                        opacityFrom: 0.8,
                        opacityTo: 0.2,
                        stops: [0, 100]
                    }
                },
                tooltip: {
                    enabled: false
                }
            };
            const ticketsChart = new ApexCharts(document.querySelector("#tickets-chart"), ticketsOptions);
            ticketsChart.render();
        }

        // Revenue Chart (Mini Line Chart)
        if (document.querySelector("#revenue-chart")) {
            const revenueOptions = {
                series: [{
                    name: 'Revenue',
                    data: [500, 520, 510, 530, 525, 540, 535, 545, 540, 550, 545, 536]
                }],
                chart: {
                    type: 'line',
                    height: 50,
                    sparkline: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                    colors: ['#ec4899']
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ec4899'],
                        inverseColors: false,
                        opacityFrom: 0.8,
                        opacityTo: 0.2,
                        stops: [0, 100]
                    }
                },
                tooltip: {
                    enabled: false
                }
            };
            const revenueChart = new ApexCharts(document.querySelector("#revenue-chart"), revenueOptions);
            revenueChart.render();
        }

        // Sales Chart (Mini Bar Chart)
        if (document.querySelector("#sales-chart")) {
            const salesOptions = {
                series: [{
                    name: 'Sales',
                    data: [400, 430, 450, 470, 490, 510, 530, 550, 570, 590, 610, 652]
                }],
                chart: {
                    type: 'bar',
                    height: 50,
                    sparkline: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: false
                    }
                },
                colors: ['#10b981'],
                tooltip: {
                    enabled: false
                }
            };
            const salesChart = new ApexCharts(document.querySelector("#sales-chart"), salesOptions);
            salesChart.render();
        }

        // Event Chart (Donut Chart)
        if (document.querySelector("#event-chart")) {
            const eventOptions = {
                series: [66],
                chart: {
                    type: 'radialBar',
                    height: 64,
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '60%'
                        },
                        track: {
                            background: '#e5e7eb'
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                show: true,
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#3b82f6',
                                offsetY: 8
                            }
                        }
                    }
                },
                colors: ['#3b82f6'],
                tooltip: {
                    enabled: false
                }
            };
            const eventChart = new ApexCharts(document.querySelector("#event-chart"), eventOptions);
            eventChart.render();
        }

        // Broadcast Activity Chart (Line Chart)
        if (document.querySelector("#broadcast-activity-chart")) {
            // Sample data for different periods
            const dailyData = {
                categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                series: [{
                    name: 'Jumlah Pesan',
                    data: [120, 150, 180, 200, 175, 160, 140]
                }]
            };

            const weeklyData = {
                categories: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                series: [{
                    name: 'Jumlah Pesan',
                    data: [850, 920, 780, 950]
                }]
            };

            const monthlyData = {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                series: [{
                    name: 'Jumlah Pesan',
                    data: [3200, 3500, 2800, 4000, 3800, 4200, 3600, 3900, 4100, 3700, 4000, 4300]
                }]
            };

            let currentPeriod = 'daily';
            let broadcastActivityChart;

            const getChartOptions = (period) => {
                let data;
                if (period === 'daily') {
                    data = dailyData;
                } else if (period === 'weekly') {
                    data = weeklyData;
                } else {
                    data = monthlyData;
                }

                return {
                    series: data.series,
                    chart: {
                        type: 'area',
                        height: 300,
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.3,
                            stops: [0, 90, 100]
                        }
                    },
                    colors: ['#FF720D'],
                    xaxis: {
                        categories: data.categories,
                        labels: {
                            style: {
                                colors: '#6b7280',
                                fontSize: '12px'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: '#6b7280',
                                fontSize: '12px'
                            },
                            formatter: function (val) {
                                return Math.floor(val);
                            }
                        }
                    },
                    grid: {
                        borderColor: '#e5e7eb',
                        strokeDashArray: 4
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + ' pesan';
                            }
                        }
                    }
                };
            };

            // Initialize chart
            const chartOptions = getChartOptions(currentPeriod);
            broadcastActivityChart = new ApexCharts(document.querySelector("#broadcast-activity-chart"), chartOptions);
            broadcastActivityChart.render();

            // Handle tab switching
            $('.broadcast-tab-btn').on('click', function () {
                const period = $(this).data('period');

                // Update active state
                $('.broadcast-tab-btn').removeClass('active bg-primary text-white').addClass('text-gray-600 hover:bg-gray-100');
                $(this).addClass('active bg-primary text-white').removeClass('text-gray-600 hover:bg-gray-100');

                // Update chart
                currentPeriod = period;
                const newOptions = getChartOptions(period);
                broadcastActivityChart.updateOptions(newOptions);
            });
        }

        // Today Chart (Mini Line Chart)
        if (document.querySelector("#today-chart")) {
            const todayOptions = {
                series: [{
                    name: 'Today',
                    data: [420, 430, 440, 445, 450, 455, 456]
                }],
                chart: {
                    type: 'line',
                    height: 50,
                    sparkline: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                    colors: ['#ffffff']
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ffffff'],
                        inverseColors: false,
                        opacityFrom: 0.8,
                        opacityTo: 0.2,
                        stops: [0, 100]
                    }
                },
                tooltip: {
                    enabled: false
                }
            };
            const todayChart = new ApexCharts(document.querySelector("#today-chart"), todayOptions);
            todayChart.render();
        }
    }

    // Initialize Calendar
    function initCalendar() {
        const calendarEl = document.getElementById('calendar-widget');
        if (!calendarEl) return;

        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        function renderCalendar() {
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            let html = `
                <div class="mb-4 text-center">
                    <h3 class="text-lg font-semibold text-gray-800">${monthNames[currentMonth]} ${currentYear}</h3>
                </div>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            let day = 1;
            for (let i = 0; i < 6; i++) {
                html += '<tr>';
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        html += '<td></td>';
                    } else if (day > daysInMonth) {
                        html += '<td></td>';
                    } else {
                        const isToday = day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear();
                        html += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
                        day++;
                    }
                }
                html += '</tr>';
                if (day > daysInMonth) break;
            }

            html += '</tbody></table>';
            calendarEl.innerHTML = html;

            // Add click handlers
            calendarEl.querySelectorAll('td').forEach(cell => {
                if (cell.textContent.trim()) {
                    cell.addEventListener('click', function () {
                        calendarEl.querySelectorAll('td').forEach(c => c.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                }
            });
        }

        renderCalendar();

        // Navigation buttons
        $(document).on('click', '.calendar-nav-btn', function (e) {
            e.preventDefault();
            const icon = $(this).find('i');
            if (icon.hasClass('ri-arrow-left-s-line')) {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            } else if (icon.hasClass('ri-arrow-right-s-line')) {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            }
        });
    }

    // Initialize Tabs
    function initTabs() {
        $('.tab-btn').on('click', function () {
            $('.tab-btn').removeClass('active');
            $(this).addClass('active');

            // Show toast notification
            const tabText = $(this).text();
            toastr.info(`Switched to ${tabText} view`);
        });
    }

    // Initialize Notifications
    function initNotifications() {
        // Configure Toastr if available
        if (typeof toastr !== 'undefined') {
            toastr.options = {
                closeButton: true,
                debug: false,
                newestOnTop: true,
                progressBar: true,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                onclick: null,
                showDuration: '300',
                hideDuration: '1000',
                timeOut: '5000',
                extendedTimeOut: '1000',
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            };
        }

        // Notification button click handlers - removed, now handled by initNotificationDropdown

        // Message button handler
        if ($('button:has(.ri-message-3-line)').length && typeof Swal !== 'undefined') {
            $('button:has(.ri-message-3-line)').on('click', function () {
                Swal.fire({
                    title: 'Messages',
                    html: '<p>You have 5 new messages</p>',
                    icon: 'info',
                    confirmButtonColor: '#FF720D',
                    confirmButtonText: 'OK'
                });
            });
        }

        // Show welcome toast only on index.html
        if (typeof toastr !== 'undefined') {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPage === 'index.html' || currentPage === '' || currentPage.endsWith('/')) {
                setTimeout(function () {
                    toastr.success('Selamat Datang di Smartcoop Broadcast!');
                }, 500);
            }
        }
    }

    // Initialize Dark Mode Toggle
    function initDarkMode() {
        if ($('#dark-mode-toggle').length) {
            $('#dark-mode-toggle').on('click', function () {
                $('body').toggleClass('dark-mode');
                const icon = $(this).find('i');
                if ($('body').hasClass('dark-mode')) {
                    icon.removeClass('ri-moon-line').addClass('ri-sun-line');
                    if (typeof toastr !== 'undefined') {
                        toastr.info('Dark mode enabled');
                    }
                } else {
                    icon.removeClass('ri-sun-line').addClass('ri-moon-line');
                    if (typeof toastr !== 'undefined') {
                        toastr.info('Light mode enabled');
                    }
                }
            });
        }
    }

    // Initialize User Profile Dropdown
    function initUserProfileDropdown() {
        const toggle = $('#user-profile-toggle');
        const dropdown = $('#user-profile-dropdown');

        // Check if elements exist
        if (!toggle.length || !dropdown.length) return;

        // Toggle dropdown on button click
        toggle.on('click', function (e) {
            e.stopPropagation();
            dropdown.toggleClass('hidden');
        });

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#user-profile-toggle').length &&
                !$(e.target).closest('#user-profile-dropdown').length) {
                dropdown.addClass('hidden');
            }
        });

        // Prevent dropdown from closing when clicking inside
        dropdown.on('click', function (e) {
            e.stopPropagation();
        });

        // Handle logout button
        $('#logout-btn').on('click', function () {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Logout',
                    text: 'Apakah Anda yakin ingin logout?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#6b7280',
                    confirmButtonText: 'Ya, Logout',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        toastr.success('Logout berhasil!');
                        dropdown.addClass('hidden');
                        // Add your logout logic here
                        // window.location.href = 'pages-login.html';
                    }
                });
            } else {
                if (confirm('Apakah Anda yakin ingin logout?')) {
                    toastr.success('Logout berhasil!');
                    dropdown.addClass('hidden');
                    // Add your logout logic here
                    // window.location.href = 'pages-login.html';
                }
            }
        });

        // Handle subscription button
        $('#user-profile-dropdown button:has(.ri-rocket-line)').on('click', function () {
            toastr.info('Perpanjang Langganan clicked');
            dropdown.addClass('hidden');
            // Add your subscription extension logic here
        });

        // Handle navigation buttons
        $('#user-profile-dropdown button:has(.ri-group-line)').on('click', function () {
            toastr.info('Manage Kontak clicked');
            dropdown.addClass('hidden');
            // Add navigation logic here
            // window.location.href = 'manage-kontak.html';
        });

        $('#user-profile-dropdown button:has(.ri-bar-chart-line)').on('click', function () {
            toastr.info('Laporan clicked');
            dropdown.addClass('hidden');
            // Add navigation logic here
            // window.location.href = 'laporan.html';
        });

        $('#user-profile-dropdown button:has(.ri-settings-3-line)').on('click', function () {
            toastr.info('Pengaturan clicked');
            dropdown.addClass('hidden');
            // Add navigation logic here
            // window.location.href = 'pengaturan.html';
        });
    }

    // Initialize Notification Dropdown
    function initNotificationDropdown() {
        const toggle = $('#notification-toggle');
        const dropdown = $('#notification-dropdown');
        const tabs = $('.notification-tab');
        const inboxContent = $('#notification-inbox');
        const agenContent = $('#notification-agen');

        // Check if elements exist
        if (!toggle.length || !dropdown.length) return;

        // Toggle dropdown on button click
        toggle.on('click', function (e) {
            e.stopPropagation();
            dropdown.toggleClass('hidden');
        });

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#notification-toggle').length &&
                !$(e.target).closest('#notification-dropdown').length) {
                dropdown.addClass('hidden');
            }
        });

        // Prevent dropdown from closing when clicking inside
        dropdown.on('click', function (e) {
            e.stopPropagation();
        });

        // Handle tab switching
        tabs.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Remove active class from all tabs
            tabs.removeClass('active border-primary text-gray-700').addClass('text-gray-500');
            tabs.removeClass('border-b-2');

            // Add active class to clicked tab
            $(this).addClass('active border-primary text-gray-700 border-b-2').removeClass('text-gray-500');

            // Show/hide content based on tab
            if ($(this).text().trim().includes('Inbox')) {
                inboxContent.removeClass('hidden');
                agenContent.addClass('hidden');
            } else {
                inboxContent.addClass('hidden');
                agenContent.removeClass('hidden');
            }
        });
    }

    // Campaign table click handler removed - table is now static without DataTables

    // Floating action buttons
    $('.fixed button:has(.ri-drop-line)').on('click', function () {
        Swal.fire({
            title: 'Quick Action',
            text: 'Quick action menu',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FF720D',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                toastr.success('Action confirmed!');
            }
        });
    });

    $('.fixed button:has(.ri-settings-3-line)').on('click', function () {
        Swal.fire({
            title: 'Settings',
            html: '<p>Settings panel would open here</p>',
            icon: 'info',
            confirmButtonColor: '#FF720D',
            confirmButtonText: 'OK'
        });
    });

    // Search functionality
    $('input[type="text"][placeholder="Search here..."]').on('keyup', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = $(this).val();
            if (searchTerm) {
                toastr.info(`Searching for: ${searchTerm}`);
            }
        }
    });

    // Add fade-in animation to cards
    $('.bg-white.rounded-xl').each(function (index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
        $(this).addClass('fade-in');
    });

    // Resize handler for charts
    $(window).on('resize', function () {
        if (typeof ApexCharts !== 'undefined') {
            ApexCharts.exec('tickets-chart', 'updateOptions', {}, true);
            ApexCharts.exec('revenue-chart', 'updateOptions', {}, true);
            ApexCharts.exec('sales-chart', 'updateOptions', {}, true);
        }
    });

    console.log('Smartcoop Broadcast Initialized Successfully!');
});

