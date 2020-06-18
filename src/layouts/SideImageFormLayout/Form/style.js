const formContainerStyle = theme => ({
  container: {
    display: 'flex',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  },
});
  
  
export default formContainerStyle;