import { jwtVerify } from "jose"
import type { NextRequest } from "next/server"

// JWT verification function
export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

// Extract token from request
export function extractTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.split(" ")[1]
}

// Get current user from request
export async function getCurrentUser(request: NextRequest) {
  try {
    const token = extractTokenFromRequest(request)
    if (!token) return null

    const payload = await verifyJwt(token)
    if (!payload || !payload.sub) return null

    return payload
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Check if user has required role
export function hasRole(user: any, roles: string | string[]) {
  if (!user) return false

  const requiredRoles = Array.isArray(roles) ? roles : [roles]
  return requiredRoles.includes(user.role)
}

// Log security event
export async function logSecurityEvent({
  userId,
  action,
  description,
  status,
  details,
  request,
}: {
  userId?: string
  action: string
  description: string
  status: string
  details?: any
  request?: NextRequest
}) {
  try {
    const ipAddress = request?.ip || request?.headers.get("x-forwarded-for") || null
    const userAgent = request?.headers.get("user-agent") || null

    console.log({
      action,
      description,
      status,
      ipAddress,
      userAgent,
      details,
      userId,
    })
  } catch (error) {
    console.error("Error logging security event:", error)
  }
}
