import { getNavItem } from '../utils/getNavItem';
import {
  TeamOutlined,
  UserOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const navItems = [
  getNavItem(<Link to="/">ABOUT US</Link>, '1', <TeamOutlined />),
  getNavItem('ENTITY', 'sub1', <UserOutlined />, [
    getNavItem(<Link to="/supplier">Supplier</Link>, '2'),
    getNavItem(<Link to="/ingredient">Ingredient</Link>, '3'),
    getNavItem(<Link to="/product">Product</Link>, '4'),
    getNavItem(<Link to="/employee">Employee</Link>, '6'),
    getNavItem(<Link to="/customer">Customer</Link>, '7'),
  ]),
  getNavItem('RELATIONAL', 'sub2', <BranchesOutlined />, [
    getNavItem(<Link to="/order">Order</Link>, '5'),
    getNavItem(<Link to="/supply">Supply</Link>, '8'),
    getNavItem(<Link to="/made">Made</Link>, '9'),
    getNavItem(<Link to="/consist">Consist</Link>, '10'),
  ]),
];
