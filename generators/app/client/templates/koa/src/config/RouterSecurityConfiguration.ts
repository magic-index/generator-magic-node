export enum RouterSecurityType {
    PERMIT = 'permit',
    AUTHENTICATED = 'authenticated',
    REJECT = 'reject'
  }
  
  export default {
    '/api': RouterSecurityType.AUTHENTICATED,
    '/api/authenticate': RouterSecurityType.PERMIT
  }
  