import App from "@/components/App/App.tsx";
import styles from './Apps.module.css';
import {AppStore} from "@/webtools/types.ts";
import {useViewStateStore} from "@/stores/ViewStateStore.ts";

type AppsProps = {
    appStore: AppStore;
};

const Apps: React.FC<AppsProps> = ({appStore}) => {
    const {selectedApp, setSelectedApp, hoveredCell} = useViewStateStore();

    const allApps = appStore.getAll();

    return (
        <div className={styles.inner}>
            {allApps.map((app, index) => (
                <div
                    key={index}
                    onClick={() => setSelectedApp(app.name)}
                    className={selectedApp === app.name ? styles.selected : ''}
                >
                    <App icon={app.icon} name={app.name}/>
                </div>
            ))}
            {hoveredCell &&
                <div id={"hoveredCell"}>
                    x: {hoveredCell[0]}
                    y: {hoveredCell[1]}
                </div>
            }
        </div>
    );
};

export default Apps;
