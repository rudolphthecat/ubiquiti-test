'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Device } from "@/app/layout";

export type State = {
    data: {
        devices: Array<Device>,
        filters: Array<string>
    },
    setFilteredDevices: Dispatch<SetStateAction<Array<Device>>>,
    filteredDevices: Array<Device>
}

export const DeviceContext = createContext<State>({
    data: {
        devices: [],
        filters: []
    },
    setFilteredDevices: () => {
    },
    filteredDevices: []
})

export default function DeviceProvider({ children, data }: {
    children: React.ReactNode,
    data: {
        devices: Device[],
        filters: string[],
    },
    filteredDevices: Device[]
}) {
    const [filteredDevices, setFilteredDevices] = useState<Array<Device>>([]);
    return <DeviceContext.Provider value={{ data, setFilteredDevices, filteredDevices }}>{children}</DeviceContext.Provider>
}