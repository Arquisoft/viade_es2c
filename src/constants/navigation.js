/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: 'img/icon/home.svg',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'timeline',
    icon: 'img/icon/inicio.svg',
    label: 'navBar.timeline',
    to: '/timeline'
  },
  {
    id: 'friends',
    icon: 'img/icon/friend.svg',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'friendsGroups',
    icon: 'img/icon/friendsGroups.svg',
    label: 'navBar.friendsGroups',
    to: '/friendsGroups'

  },
  {
    id: 'createroute',
    icon: 'img/icon/ruta.svg',
    label: 'navBar.createroute',
    to: '/createrouteselector'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  //{
  //  label: 'navBar.formModelConvert',
  //  onClick: 'formModelConvertRedirect'
  //},
  //{
  //  label: 'navBar.formModelRender',
  //  onClick: 'formModelRenderRedirect'
  //},
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
