export default {
  loginEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
