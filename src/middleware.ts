import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {

    // Declarer que la variable path contient l'url passer avec la requete http
    const path = request.nextUrl.pathname


    // Conditions 
    const isPublicPath = path === '/login' || path ==='/signup'
    const token =  request.cookies.get('token')?.value || ''

    //Verification
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup', 
  ]
}