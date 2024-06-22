import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MenuBar.module.css';
import GET_PIXELS_QUERY from "@/../graphql/GetPixels.graphql";
import { useDojoPixelStore } from '@/stores/DojoPixelStore';
import { Bounds, Coordinate, MAX_UINT32, Pixel, PixelStore } from "@/webtools/types.ts";
import { areBoundsEqual, MAX_VIEW_SIZE } from "@/webtools/utils.ts";
import { GraphQLClient } from 'graphql-request';
import { shortString } from "starknet";
import { produce } from 'immer';


type GetPixelsResponse = {
    pixelModels: {
        edges: Array<{
            node: Pixel;
        }>;
    };
};

interface MenuBarProps {
    pixelStore: number[][];
}

type State = { [key: string]: Pixel | undefined };

// const MenuBar: React.FC<MenuBarProps> = ({ pixelStore }) => {
const MenuBar: React.FC = () => {
        const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState<State>({});

    // Determine if the settings page is shown based on the current path
    const showSettings = location.pathname === '/settings';
    const showGovernance = location.pathname !== '/governance';

    const baseUrl = "http://localhost:8080";
    const gqlClient = baseUrl ? new GraphQLClient(`${baseUrl}/graphql`) : null;


    const toggleSettings = () => {
        if (showSettings) {
            navigate(-1); // Go back if we're currently showing settings
        } else {
            navigate('/settings'); // Navigate to settings if not currently showing
        }
    };

    // useEffect(() => {
    //     // const bounds = [[0, 0], [10, 10]];
    //     const bounds = JSON.stringify([[0, 0], [10, 10]]);
    //     const store = useDojoPixelStore(bounds);
    //     console.log("hhhhheeeeerrrreeee");
    //     console.log(store);
    //     // setPixelStore(store);
    // }, [pixelStore]);

    const exportJson = () => {
        console.log("export a json file");

        if (!gqlClient) return;

        let bounds = [[0, 0], [20, 20]];

        let [[left, top], [right, bottom]] = bounds;

        if (left > MAX_VIEW_SIZE && left > right) right = MAX_UINT32;
        if (top > MAX_VIEW_SIZE && top > bottom) bottom = MAX_UINT32;

        gqlClient.request<GetPixelsResponse>(GET_PIXELS_QUERY, {
            first: 50000,
            where: {
                "xGTE": left,
                "xLTE": right,
                "yGTE": top,
                "yLTE": bottom
            }
        }).then((data) => {
            const obstacles = data!.pixelModels!.edges!.map(({ node }: { node: Pixel }) => {
                const pixel: Pixel = {
                    ...node,
                    text: shortString.decodeShortString(node.text),
                    action: shortString.decodeShortString(node.action),
                    timestamp: parseInt(node.timestamp as string, 16),
                };
                let block_type: string;
                if (pixel.color === 4278190080) { // red
                    block_type = "spike";
                } else if (pixel.color === 16711680) { // green
                    block_type = "block";
                } else {
                    block_type = "null";
                }
                // return { x: pixel.x, y: pixel.y, type: "block" }; 
                return { x: pixel.x, y: pixel.y, type: block_type }; 
            });
            
            const json = JSON.stringify({ obstacles }, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pixels.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        }).catch((e) => {
            console.error("Error retrieving pixels from torii for", bounds, e.message)
        })

        // // pixelStore.
        // const bounds = JSON.stringify([[0, 0], [10, 10]]);
        // console.log(pixelStore.getPixel(JSON.stringify([1, 1])));
        // console.log(pixelStore.getPixel());
    };

    return (
        <div className={styles.inner}>
            <div className={styles.logoContainer} onClick={() => navigate('/')}>
                <img src="/assets/logo/pixeLaw-logo.png" alt="logo"/>

            </div>
            <div>
                <button className={styles.menuButton} onClick={exportJson}>
                    Export a stage
                </button>
            </div>
            {/* <div>
                {showGovernance && <button className={styles.menuButton} onClick={() => navigate('/governance')}>Governance</button>}
                <button className={styles.menuButton} onClick={toggleSettings}>Settings</button>
            </div> */}
        </div>
    );
};

export default MenuBar;
