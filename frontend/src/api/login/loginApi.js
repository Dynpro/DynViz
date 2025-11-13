import axios from 'axios'
import jwt from 'jsonwebtoken'

// ** Default AuthConfig
// import authConfig from 'src/configs/auth'

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )

    if (response.status === 202 && response.data.code === 202) {
      const accessToken = response.data.Data.JWTToken

      // Decode the token to get user data
      const decodedToken = jwt.decode(accessToken)

      const userData = {
        email: email,
        role: response.data.Data.UserData.RoleName || 'admin',
        id: response.data.Data.UserData.ID,
        fullName: response.data.Data.UserData.Name, // Get full name from response
        username: decodedToken.username, // Assuming username is part of the token payload
        userId: response.data.Data.UserData.ID,
        orgId: response.data.Data.UserData.OrganizationID
      }

      return { accessToken, userData }
    } else {
      throw new Error('Invalid email or password')
    }
  } catch (err) {
    throw new Error('Server error')
  }
}

//  session management by arman khan
