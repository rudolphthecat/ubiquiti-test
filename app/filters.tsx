import styles from "./filters.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { viewTypes } from "@/app/list";
import { uniq, without, filter, debounce } from "lodash";
import { useRouter } from "next/navigation";
import { Device } from "@/app/layout";
import Link from 'next/link'
import { Lato } from "next/font/google";

type Props = {
    amount: number,
    setViewType: Dispatch<SetStateAction<number>>,
    viewType: number,
    selectedLines: string[],
    setSelectedLines: Dispatch<SetStateAction<string[]>>,
    lines: string[],
    devices: Device[]
}

const latoBold = Lato({
    weight: ['700'],
    subsets: ['latin']
});

export default function Filters(
    {
        amount,
        setViewType,
        viewType,
        selectedLines,
        setSelectedLines,
        lines,
        devices
    }: Props) {
    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Array<Device>>([]);
    const router = useRouter();

    useEffect(() => {
        if (searchString) {
            const matches = filter(devices, device => {
                // todo: search 'abbrev' values as well
                return device.product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            });
            console.log(devices)
            setSearchResults(matches);
        } else {
            setSearchResults([]);
        }
    }, [searchString]);

    // todo:
    //  * add lodash 'debounce' to input;
    //  * add 'blur' events to dropdowns and 'options';

    return (
        <div className={styles.filters}>
            <div className={styles.search}>
                <label />
                <input type="text" placeholder="Search" onChange={e => setSearchString(e.target.value)}></input>
                {searchResults.length > 0 &&
                    <div className={styles.matching}>
                        {searchResults.map((device) => {
                            const index = device.product.name.toLowerCase().indexOf(searchString.toLowerCase());
                            return (
                                <Link
                                    href={`/device/${device.id}`}
                                    key={device.id}
                                >
                                    <span>
                                        {index > 0 ? device.product.name.substring(0, index) : null}
                                        <strong className={latoBold.className}>
                                            {device.product.name.substring(index, index + searchString.length)}
                                        </strong>
                                        {index + searchString.length !== device.product.name.length ? device.product.name.substring(index + searchString.length, device.product.name.length - 1) : null}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>}
                <span>{amount} devices</span>
            </div>
            <div className={styles.toggles}>
                <span>
                    <svg
                        onClick={() => setViewType(viewTypes.list)}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask id="path-1-inside-1_2_850" fill="white">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6 4.5C6 5.32843 5.32843 6 4.5 6C3.67157 6 3 5.32843 3 4.5C3 3.67157 3.67157 3 4.5 3C5.32843 3 6 3.67157 6 4.5ZM7.75 3.75H16.25C16.664 3.75 17 4.086 17 4.5C17 4.914 16.664 5.25 16.25 5.25H7.75C7.336 5.25 7 4.914 7 4.5C7 4.086 7.336 3.75 7.75 3.75ZM4.5 11.5C5.32843 11.5 6 10.8284 6 10C6 9.17157 5.32843 8.5 4.5 8.5C3.67157 8.5 3 9.17157 3 10C3 10.8284 3.67157 11.5 4.5 11.5ZM7.75 9.25H16.25C16.664 9.25 17 9.586 17 10C17 10.414 16.664 10.75 16.25 10.75H7.75C7.336 10.75 7 10.414 7 10C7 9.586 7.336 9.25 7.75 9.25ZM4.5 17C5.32843 17 6 16.3284 6 15.5C6 14.6716 5.32843 14 4.5 14C3.67157 14 3 14.6716 3 15.5C3 16.3284 3.67157 17 4.5 17ZM7.75 14.75H16.25C16.664 14.75 17 15.086 17 15.5C17 15.914 16.664 16.25 16.25 16.25H7.75C7.336 16.25 7 15.914 7 15.5C7 15.086 7.336 14.75 7.75 14.75Z"
                        />
                        </mask>
                        <path
                            d="M4.5 7C5.88071 7 7 5.88071 7 4.5H5C5 4.77614 4.77614 5 4.5 5V7ZM2 4.5C2 5.88071 3.11929 7 4.5 7V5C4.22386 5 4 4.77614 4 4.5H2ZM4.5 2C3.11929 2 2 3.11929 2 4.5H4C4 4.22386 4.22386 4 4.5 4V2ZM7 4.5C7 3.11929 5.88071 2 4.5 2V4C4.77614 4 5 4.22386 5 4.5H7ZM16.25 2.75H7.75V4.75H16.25V2.75ZM18 4.5C18 3.53372 17.2163 2.75 16.25 2.75V4.75C16.1117 4.75 16 4.63828 16 4.5H18ZM16.25 6.25C17.2163 6.25 18 5.46628 18 4.5H16C16 4.36172 16.1117 4.25 16.25 4.25V6.25ZM7.75 6.25H16.25V4.25H7.75V6.25ZM6 4.5C6 5.46628 6.78372 6.25 7.75 6.25V4.25C7.88828 4.25 8 4.36172 8 4.5H6ZM7.75 2.75C6.78372 2.75 6 3.53372 6 4.5H8C8 4.63828 7.88828 4.75 7.75 4.75V2.75ZM5 10C5 10.2761 4.77614 10.5 4.5 10.5V12.5C5.88071 12.5 7 11.3807 7 10H5ZM4.5 9.5C4.77614 9.5 5 9.72386 5 10H7C7 8.61929 5.88071 7.5 4.5 7.5V9.5ZM4 10C4 9.72386 4.22386 9.5 4.5 9.5V7.5C3.11929 7.5 2 8.61929 2 10H4ZM4.5 10.5C4.22386 10.5 4 10.2761 4 10H2C2 11.3807 3.11929 12.5 4.5 12.5V10.5ZM16.25 8.25H7.75V10.25H16.25V8.25ZM18 10C18 9.03372 17.2163 8.25 16.25 8.25V10.25C16.1117 10.25 16 10.1383 16 10H18ZM16.25 11.75C17.2163 11.75 18 10.9663 18 10H16C16 9.86171 16.1117 9.75 16.25 9.75V11.75ZM7.75 11.75H16.25V9.75H7.75V11.75ZM6 10C6 10.9663 6.78372 11.75 7.75 11.75V9.75C7.88828 9.75 8 9.86171 8 10H6ZM7.75 8.25C6.78372 8.25 6 9.03372 6 10H8C8 10.1383 7.88828 10.25 7.75 10.25V8.25ZM5 15.5C5 15.7761 4.77614 16 4.5 16V18C5.88071 18 7 16.8807 7 15.5H5ZM4.5 15C4.77614 15 5 15.2239 5 15.5H7C7 14.1193 5.88071 13 4.5 13V15ZM4 15.5C4 15.2239 4.22386 15 4.5 15V13C3.11929 13 2 14.1193 2 15.5H4ZM4.5 16C4.22386 16 4 15.7761 4 15.5H2C2 16.8807 3.11929 18 4.5 18V16ZM16.25 13.75H7.75V15.75H16.25V13.75ZM18 15.5C18 14.5337 17.2163 13.75 16.25 13.75V15.75C16.1117 15.75 16 15.6383 16 15.5H18ZM16.25 17.25C17.2163 17.25 18 16.4663 18 15.5H16C16 15.3617 16.1117 15.25 16.25 15.25V17.25ZM7.75 17.25H16.25V15.25H7.75V17.25ZM6 15.5C6 16.4663 6.78371 17.25 7.75 17.25V15.25C7.88829 15.25 8 15.3617 8 15.5H6ZM7.75 13.75C6.78371 13.75 6 14.5337 6 15.5H8C8 15.6383 7.88829 15.75 7.75 15.75V13.75Z"
                            fill={viewType === 0 ? '#006FFF' : '#838691'}
                            mask="url(#path-1-inside-1_2_850)"
                        />
                    </svg>
                </span>
                <span>
                    <svg
                        onClick={() => setViewType(viewTypes.grid)}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.5 8.5V4H4V8.5H8.5ZM4 3H8.5C9.052 3 9.5 3.448 9.5 4V8.5C9.5 9.052 9.052 9.5 8.5 9.5H4C3.448 9.5 3 9.052 3 8.5V4C3 3.448 3.448 3 4 3ZM8.5 16V11.5H4V16H8.5ZM4 10.5H8.5C9.052 10.5 9.5 10.948 9.5 11.5V16C9.5 16.552 9.052 17 8.5 17H4C3.448 17 3 16.552 3 16V11.5C3 10.948 3.448 10.5 4 10.5ZM16 4V8.5H11.5V4H16ZM16 3H11.5C10.948 3 10.5 3.448 10.5 4V8.5C10.5 9.052 10.948 9.5 11.5 9.5H16C16.552 9.5 17 9.052 17 8.5V4C17 3.448 16.552 3 16 3ZM16 16V11.5H11.5V16H16ZM11.5 10.5H16C16.552 10.5 17 10.948 17 11.5V16C17 16.552 16.552 17 16 17H11.5C10.948 17 10.5 16.552 10.5 16V11.5C10.5 10.948 10.948 10.5 11.5 10.5Z"
                            fill={viewType === 1 ? '#006FFF' : '#838691'}
                        />
                    </svg>
                </span>
                <span>
                    <label
                        onClick={() => setOpenFilters(!openFilters)}
                        className={openFilters ? styles.open : ''}
                    >
                        Filter
                    </label>
                    {openFilters && <div className={styles.dropdown}>
                        {lines.map((line, i) => (
                            <div key={line}>
                                <input
                                    type="checkbox"
                                    value={line}
                                    checked={selectedLines.indexOf(line) !== -1}
                                    id={`filters-check-${i}`}
                                    onChange={() => {
                                        if (selectedLines.indexOf(line) !== -1) {
                                            setSelectedLines(without(selectedLines, line));
                                        } else {
                                            setSelectedLines(uniq([...selectedLines, line]));
                                        }
                                    }}
                                />
                                <label htmlFor={`filters-check-${i}`}>{line}</label>
                            </div>
                        ))}
                        <div
                            className={styles.reset}
                            style={selectedLines.length ? {
                                fontWeight: 900,
                                color: "#F03A3E"
                            } : {}}
                            onClick={() => {
                                router.replace("/");
                                setSelectedLines([]);
                            }}
                        >
                            Reset
                        </div>
                    </div>}
                </span>

            </div>
        </div>
    );
}
