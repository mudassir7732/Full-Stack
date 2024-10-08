import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect } from 'react';
import "../../assets/soft-ui-dashboard.css";
import Chart from 'chart.js/auto';

const UserDashboard = () => {
    useEffect(() => {
        const ctx = document.getElementById('chart-bars').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                    backgroundColor: "#fff",
                    data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                    maxBarThickness: 6
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 500,
                            beginAtZero: true,
                            padding: 15,
                            font: {
                                size: 14,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                            color: "#fff"
                        },
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false
                        },
                        ticks: {
                            display: false
                        },
                    },
                },
            },
        });
        // Return a cleanup function to destroy the chart when the component unmounts
        return () => {
            chart.destroy();
        };
    }, []);


    useEffect(() => {
        // Create a new Chart instance when the component mounts
        const ctx = document.getElementById('chart-line').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Mobile apps",
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                    borderColor: "#cb0c9f",
                    borderWidth: 3,
                    backgroundColor: 'rgba(203,12,159,0.2)',
                    fill: true,
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    maxBarThickness: 6
                },
                {
                    label: "Websites",
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                    borderColor: "#3A416F",
                    borderWidth: 3,
                    backgroundColor: 'rgba(20,23,39,0.2)',
                    fill: true,
                    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                    maxBarThickness: 6
                },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 20,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });
        return () => {
            chart.destroy();
        };
    }, []);


    return (
        <div className="g-sidenav-show bg-gray-100">
            <main className="main-content position-relative h-fit border-radius-lg">
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-3  flex flex-row items-center justify-between">
                        <nav aria-label="breadcrumb" className=''>
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark font-sans" href="javascript:;">Pages</a></li>
                                <li className="breadcrumb-item text-sm text-dark active font-sans" aria-current="page">Dashboard</li>
                            </ol>
                            <h6 className="font-weight-bolder mb-0 font-sans">Dashboard</h6>
                        </nav>

                        <div className="flex flex-row mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                <div className="input-group">
                                    <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                    <input type="text" className="form-control font-sans" placeholder="Type here..." />
                                </div>
                            </div>
                            <ul className="navbar-nav  justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                    <a className="btn btn-outline-primary btn-sm mb-0 me-3 font-sans" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-soft-ui-dashboard">Online Builder</a>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                                        <i className="fa fa-user me-sm-1"></i>
                                        <span className="d-sm-inline d-none font-sans">Sign In</span>
                                    </a>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item px-3 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0">
                                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-bell cursor-pointer"></i>
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                        <li className="mb-2">
                                            <a className="dropdown-item border-radius-md" href="javascript:;">
                                                <div className="d-flex py-1">
                                                    <div className="my-auto">
                                                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="text-sm font-weight-normal mb-1">
                                                            <span className="font-weight-bold">New message</span> from Laur
                                                        </h6>
                                                        <p className="text-xs text-secondary mb-0 ">
                                                            <i className="fa fa-clock me-1"></i>
                                                            13 minutes ago
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="mb-2">
                                            <a className="dropdown-item border-radius-md" href="javascript:;">
                                                <div className="d-flex py-1">
                                                    <div className="my-auto">
                                                        <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 " />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="text-sm font-weight-normal mb-1">
                                                            <span className="font-weight-bold">New album</span> by Travis Scott
                                                        </h6>
                                                        <p className="text-xs text-secondary mb-0 ">
                                                            <i className="fa fa-clock me-1"></i>
                                                            1 day
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item border-radius-md" href="javascript:;">
                                                <div className="d-flex py-1">
                                                    <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <title>credit-card</title>
                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(453.000000, 454.000000)">
                                                                            <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                                                            <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="text-sm font-weight-normal mb-1">
                                                            Payment successfully completed
                                                        </h6>
                                                        <p className="text-xs text-secondary mb-0 ">
                                                            <i className="fa fa-clock me-1"></i>
                                                            2 days
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>



                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-sans font-weight-bold">Today's Money</p>
                                                <h5 className="font-weight-bolder mb-0 font-sans">
                                                    $53,000
                                                    <span className="text-success text-sm font-weight-bolder font-sans ml-1">+55%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i className="ni ni-money-coins text-lg opacity-5"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold font-sans">Today's Users</p>
                                                <h5 className="font-weight-bolder mb-0 font-sans">
                                                    2,300
                                                    <span className="text-success text-sm font-weight-bolder font-sans ml-1">+3%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold font-sans">New Clients</p>
                                                <h5 className="font-weight-bolder mb-0 font-sans">
                                                    +3,462
                                                    <span className="text-danger text-sm font-weight-bolder font-sans ml-1">-2%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">Sales</p>
                                                <h5 className="font-weight-bolder mb-0 font-sans">
                                                    $103,430
                                                    <span className="text-success text-sm font-weight-bolder font-sans ml-1">+5%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-7 mb-lg-0 mb-4">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="d-flex flex-column h-100">
                                                <p className="mb-1 pt-2 text-bold font-sans">Built by developers</p>
                                                <h5 className="font-weight-bolder font-sans">Soft UI Dashboard</h5>
                                                <p className="mb-5v font-sans">From colors, cards, typography to complex elements, you will find the full documentation.</p>
                                                <a className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto font-sans" href="javascript:;">
                                                    Read More
                                                    <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                                            <div className="bg-gradient-primary border-radius-lg h-100">
                                                <img src="/assets/img/shapes/waves-white.svg" className="position-absolute h-100 w-50 top-0 d-lg-block d-none" alt="waves" />
                                                <div className="position-relative d-flex align-items-center justify-content-center h-100">
                                                    <img className="w-100 position-relative z-index-2 pt-4" src="../assets/img/illustrations/rocket-white.png" alt="rocket" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card h-100 p-3">
                                <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100" style={{ backgroundImage: 'url(../assets/img/ivancik.jpg)' }}>
                                    <span className="mask bg-gradient-dark"></span>
                                    <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                                        <h5 className="text-white font-weight-bolder mb-4 pt-2 font-sans">Work with the rockets</h5>
                                        <p className="text-white font-sans">Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.</p>
                                        <a className="text-white text-sm font-sans font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                                            Read More
                                            <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row mt-4">

                        <div className="col-lg-5 mb-lg-0 mb-4">
                            <div className="card z-index-2">
                                <div className="card-body p-3">
                                    <div className="bg-gradient-dark border-radius-lg py-3 pe-1 mb-3">
                                        <div className="chart">
                                            <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
                                        </div>
                                    </div>

                                    <h6 className="ms-2 mt-4 mb-0 font-sans"> Active Users </h6>
                                    <p className="text-sm ms-2 font-sans"> (<span className="font-weight-bolder font-sans">+23%</span>) than last week </p>

                                    <div className="container border-radius-lg">
                                        <div className="row">
                                            <div className="col-3 py-3 ps-0">
                                                <div className="d-flex mb-2">
                                                    <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-primary text-center me-2 d-flex align-items-center justify-content-center">
                                                        <svg width="10px" height="10px" viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <title>document</title>
                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(154.000000, 300.000000)">
                                                                            <path className="color-background" d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z" opacity="0.603585379"></path>
                                                                            <path className="color-background" d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs mt-1 mb-0 font-weight-bold font-sans">Users</p>
                                                </div>
                                                <h4 className="font-weight-bolder font-sans">36K</h4>
                                                <div className="progress w-75">
                                                    <div className="progress-bar bg-dark w-60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-3 py-3 ps-0">
                                                <div className="d-flex mb-2">
                                                    <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center">
                                                        <svg width="10px" height="10px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <title>spaceship</title>
                                                            <g e="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(4.000000, 301.000000)">
                                                                            <path className="color-background" d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"></path>
                                                                            <path className="color-background" d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"></path>
                                                                            <path className="color-background" d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z" opacity="0.598539807"></path>
                                                                            <path className="color-background" d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z" opacity="0.598539807"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs mt-1 mb-0 font-weight-bold font-sans">Clicks</p>
                                                </div>
                                                <h4 className="font-weight-bolder font-sans">2m</h4>
                                                <div className="progress w-75">
                                                    <div className="progress-bar bg-dark w-90" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-3 py-3 ps-0">
                                                <div className="d-flex mb-2">
                                                    <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-warning text-center me-2 d-flex align-items-center justify-content-center">
                                                        <svg width="10px" height="10px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <title>credit-card</title>
                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(453.000000, 454.000000)">
                                                                            <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                                                            <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs mt-1 mb-0 font-weight-bold font-sans">Sales</p>
                                                </div>
                                                <h4 className="font-weight-bolder font-sans">435$</h4>
                                                <div className="progress w-75">
                                                    <div className="progress-bar bg-dark w-30" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-3 py-3 ps-0">
                                                <div className="d-flex mb-2">
                                                    <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-danger text-center me-2 d-flex align-items-center justify-content-center">
                                                        <svg width="10px" height="10px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <title>settings</title>
                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(304.000000, 151.000000)">
                                                                            <polygon className="color-background" opacity="0.596981957" points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"></polygon>
                                                                            <path className="color-background" d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z" opacity="0.596981957"></path>
                                                                            <path className="color-background" d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs mt-1 mb-0 font-weight-bold font-sans">Items</p>
                                                </div>
                                                <h4 className="font-weight-bolder font-sans">43</h4>
                                                <div className="progress w-75">
                                                    <div className="progress-bar bg-dark w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-lg-7">
                            <div className="card z-index-2">
                                <div className="card-header pb-0">
                                    <h6 className=" font-sans">Sales overview</h6>
                                    <p className="text-sm font-sans">
                                        <i className="fa fa-arrow-up text-success"></i>
                                        <span className="font-weight-bold font-sans">4% more</span> in 2021
                                    </p>
                                </div>
                                <div className="card-body p-3">
                                    <div className="chart">
                                        <canvas id="chart-line" className="chart-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                            <div className="card">
                                <div className="card-header pb-0">
                                    <div className="row">
                                        <div className="col-lg-6 col-7">
                                            <h6 className=" font-sans">Projects</h6>
                                            <p className="text-sm mb-0 font-sans">
                                                <i className="fa fa-check text-info" aria-hidden="true"></i>
                                                <span className="font-weight-bold ms-1 font-sans">30 done</span> this month
                                            </p>
                                        </div>
                                        <div className="col-lg-6 col-5 my-auto text-end">
                                            <div className="dropdown float-lg-end pe-4">
                                                <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-secondary"></i>
                                                </a>
                                                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 font-sans">Companies</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 font-sans">Members</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 font-sans">Budget</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 font-sans">Completion</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm me-3" alt="xd" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm font-sans">Soft UI XD Version</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                                <img src="../assets/img/team-1.jpg" alt="team1" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                                <img src="../assets/img/team-2.jpg" alt="team2" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                                                <img src="../assets/img/team-3.jpg" alt="team3" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                                <img src="../assets/img/team-4.jpg" alt="team4" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> $14,000 </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">60%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm me-3" alt="atlassian" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm font-sans">Add Progress Track</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                                <img src="../assets/img/team-2.jpg" alt="team5" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                                <img src="../assets/img/team-4.jpg" alt="team6" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> $3,000 </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">10%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm font-sans">Fix Platform Errors</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                                <img src="../assets/img/team-3.jpg" alt="team8" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                                <img src="../assets/img/team-1.jpg" alt="team9" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> Not set </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">100%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm me-3" alt="spotify" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-smv font-sans">Launch our Mobile App</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                                <img src="../assets/img/team-4.jpg" alt="user1" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                                <img src="../assets/img/team-3.jpg" alt="user2" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                                                <img src="../assets/img/team-4.jpg" alt="user3" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                                <img src="../assets/img/team-1.jpg" alt="user4" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> $20,500 </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">100%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm me-3" alt="jira" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm font-sans">Add the New Pricing Page</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                                <img src="../assets/img/team-4.jpg" alt="user5" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> $500 </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">25%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="25"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm me-3" alt="invision" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm font-sans">Redesign New Online Shop</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                                <img src="../assets/img/team-1.jpg" alt="user6" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                                <img src="../assets/img/team-4.jpg" alt="user7" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs font-weight-bold font-sans"> $2,000 </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="progress-wrapper w-75 mx-auto">
                                                            <div className="progress-info">
                                                                <div className="progress-percentage">
                                                                    <span className="text-xs font-weight-bold font-sans">40%</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="40"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100">
                                <div className="card-header pb-0">
                                    <h6 className='font-sans'>Orders overview</h6>
                                    <p className="text-sm font-sans">
                                        <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                        <span className="font-weight-bold font-sans">24%</span> this month
                                    </p>
                                </div>
                                <div className="card-body p-3">
                                    <div className="timeline timeline-one-side">
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="ni ni-bell-55 text-success text-gradient"></i>
                                            </span>
                                            <div className="timeline-content font-sans">
                                                <h6 className=" font-sans text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">22 DEC 7:20 PM</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="ni ni-html5 text-danger text-gradient"></i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0 font-sans">New order #1832412</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">21 DEC 11 PM</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="ni ni-cart text-info text-gradient"></i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0 font-sans">Server payments for April</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">21 DEC 9:34 PM</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="ni ni-credit-card text-warning text-gradient"></i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0 font-sans">New card added for order #4395133</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">20 DEC 2:20 AM</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="ni ni-key-25 text-primary text-gradient"></i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0 font-sans">Unlock packages for development</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">18 DEC 4:54 AM</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block">
                                            <span className="timeline-step">
                                                <i className="ni ni-money-coins text-dark text-gradient"></i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0 font-sans">New order #9583120</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0 font-sans">17 DEC</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer pt-3  ">
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-lg-6 mb-lg-0 mb-4">
                                    <div className="copyright text-center font-sans text-sm text-muted text-lg-start">
                                        © {new Date().getFullYear()}, made with <i className="fa fa-heart"></i> by
                                        <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank"> Creative Tim </a>
                                        for a better web.
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com" className="nav-link text-muted font-sans" target="_blank">Creative Tim</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted font-sans" target="_blank">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/blog" className="nav-link text-muted font-sans" target="_blank">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted font-sans" target="_blank">License</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
            <div className="fixed-plugin">
                <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
                    <i className="fa fa-cog py-2"> </i>
                </a>
                <div className="card shadow-lg ">
                    <div className="card-header pb-0 pt-3 ">
                        <div className="float-start">
                            <h5 className="mt-3 mb-0">Soft UI Configurator</h5>
                            <p>See our dashboard options.</p>
                        </div>
                        <div className="float-end mt-4">
                            <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                                <i className="fa fa-close"></i>
                            </button>
                        </div>
                    </div>
                    <hr className="horizontal dark my-1" />
                </div>
            </div>
        </div>

    )
}
export default UserDashboard;