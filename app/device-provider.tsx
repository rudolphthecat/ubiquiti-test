'use client'

import { createContext } from 'react'
import { Device } from "@/app/layout";

export const DeviceContext = createContext<Array<Device>>([])

export default function DeviceProvider({ children, value }: { children: React.ReactNode, value: Device[] }) {
    return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}