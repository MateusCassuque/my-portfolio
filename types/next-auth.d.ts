// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Extendendo a interface User padrão para incluir o id
   */
  interface User {
    id: string;
    username?: string;
  }

  /**
   * Extendendo a interface Session para incluir o id do usuário
   */
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** 
   * Extendendo a interface JWT para incluir o id do usuário 
   */
  interface JWT {
    id: string;
  }
}

// // next-auth.d.ts
// import NextAuth from 'next-auth'

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string
//       name: string
//     }
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string
//   }
// }