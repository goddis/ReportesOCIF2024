export const navbarData = [
    {
        routeLink: '',
        icon: 'home',
        label: 'Inicio'
    },
    {
        routeLink: 'administracion',
        icon: 'settings',
        label: 'Administración',
        submenu: [{
            routeLink: 'administracion/areas',
            icon: 'assignment',
            label: 'Áreas',
        }],
        submenuVisible: false
    },
    {
        routeLink: 'seguridad',
        icon: 'security',
        label: 'Seguridad',
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
                routeLink: 'permisos',
                icon: 'lock_open',
                label: 'Permisos',
            },
        ],
        submenuVisible: false
    },
    {
        routeLink: 'parametrizacion',
        icon: 'view_quilt',
        label: 'Parametrización',
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
        submenuVisible: false
    },
]

