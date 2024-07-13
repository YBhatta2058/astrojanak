import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const token = request.cookies.get('token')
    console.log(token)
    
    // if(!token || token == null || token == undefined || token == ''){
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    // else{
    //     console.log("There is user")
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
}
 
export const config = {
  matcher: ['/login','/register'],
}