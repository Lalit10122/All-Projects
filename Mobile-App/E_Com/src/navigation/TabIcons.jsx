import Icon from '@components/atoms/icon';

export const Homeicon = ({ focused, size, color }) => {
  return <Icon 
  name={focused ? 'home' : 'home-outline'}
  size={size}
  iconFamily='Ionicons'
  color={color}
   />;
};

export const Categoriesicon = ({ focused, size, color }) => {
  return <Icon 
  name={focused ? 'grid' : 'grid-outline'}
  size={size}
  iconFamily='Ionicons'
  color={color}
   />;
};

export const Accounticon = ({ focused, size, color }) => {
  return <Icon 
  name={focused ? 'person' : 'person-outline'}
  size={size}
  iconFamily='Ionicons'
  color={color}
   />;
};

export const Carticon = ({ focused, size, color }) => {
  return <Icon 
  name={focused ? 'cart' : 'cart-outline'}
  size={size}
  iconFamily='MaterialCommunityIcons'
  color={color}
   />;
};

