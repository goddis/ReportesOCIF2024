export const navbarData = [
    {
        routeLink: '',
        icon: 'home',
        label: 'Inicio'
    },
    {
        routeLink: '#submenu_admin',
        id: "submenu_admin",
        icon: 'settings',
        label: 'Administración',
        openSubMenu: false,
        submenu: [{
            routeLink: 'administracion/areas',
            icon: 'assignment',
            label: 'Áreas',
        }],
    },
    {
        routeLink: '#submenu_seguridad',
        id: "submenu_seguridad",
        icon: 'security',
        label: 'Seguridad',
        openSubMenu: false,
        submenu: [
            {
                routeLink: 'seguridad/usuarios',
                icon: 'supervised_user_circle',
                label: 'Usuarios',
            },
            {
                routeLink: 'seguridad/grupoSeguridad',
                icon: 'verified_user',
                label: 'Grupo de seguridad',
            },
            {
                routeLink: 'seguridad/permisos',
                icon: 'lock_open',
                label: 'Permisos',
            },
        ],
    },
    {
        routeLink: '#submenu_parametrizacion',
        id: "submenu_parametrizacion",
        icon: 'view_quilt',
        label: 'Parametrización',
        openSubMenu: false,
        submenu: [
            {
                routeLink: 'parametrizacion/formatos',
                icon: 'assignment',
                label: 'Formatos',
            },
            {
                routeLink: 'parametrizacion/nodos',
                icon: 'library_books',
                label: 'Nodos',
            },
        ],
    },
    {
        routeLink: '#submenu_carga',
        id: "submenu_carga",
        icon: 'cloud_upload',
        label: 'Carga',
        openSubMenu: false,
        submenu: [
            {
                routeLink: 'carga/cargarFormatos',
                icon: 'create_new_folder',
                label: 'Cargar formatos',
            },
        ],
    },
    {
        routeLink: 'informes',
        icon: 'assessment',
        label: 'Informes'
    },
]

