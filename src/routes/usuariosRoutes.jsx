import {lazy} from 'react'

const UserList = lazy(() => import('../pages/usuarios/UserList'))
const EditUser = lazy(() => import('../data/usuarios/EditUser'))
const CreateUser = lazy(() => import('../data/usuarios/CreateUser'))
const Roles = lazy(() => import('../data/usuarios/rol/roles'))
const EditRoles = lazy(() => import('../data/usuarios/rol/EditRoles'))
const CreateRoles = lazy(() => import('../data/usuarios/rol/CreateRoles'))

export const usuariosRoutes = [
    // usuarios
    { path: "/userList", element: <UserList /> },
    { path: "/editUser/:id", element: <EditUser /> },
    { path: "/createUser", element: <CreateUser /> },
    //roles
    { path: "/roles", element: <Roles /> },
    { path: "/editRol/:id", element: <EditRoles /> },
    { path: "/createRol", element: <CreateRoles /> },
]