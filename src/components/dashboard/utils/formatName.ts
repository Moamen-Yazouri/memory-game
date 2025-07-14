import { IUser } from "@/@types"

export const getInitials = (user: IUser | null) => {
    if(!user) return "";
    const names = user.name.split(" ")
    return names.length > 1 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0][0].toUpperCase()
  }