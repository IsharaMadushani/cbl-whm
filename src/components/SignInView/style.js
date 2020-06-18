const styles = (theme) => ({    
    container: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    avatarActivityIndicator: {
      marginTop: 10,
      marginBottom: 5,
      position: 'relative',
    },
    avatarSignIn: {
      position: 'absolute',
      top: 0,
      height: 40,
      width: 40,
      backgroundColor: theme.palette.secondary.main,
    },
    avatarSuccess: {
      height: 40,
      width: 40,
      backgroundColor: theme.palette.success.main,
    },
    fabProgress: {
      color: theme.palette.success.main,
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    alert: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
    button: {
      marginTop: 15,
      marginBottom: 20,
    },
})


export default styles;