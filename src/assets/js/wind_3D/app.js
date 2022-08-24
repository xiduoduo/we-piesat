import { Wind3D } from "./wind3D"
import { Panel } from "./gui"



export const setWind3D = function (viewer,jsonUrl,particlesType) {
    const mode = {
        // debug: demo ? false : true
        debug: false
    };

    var panel = new Panel(particlesType);
    var wind3D = new Wind3D(
        panel,
        mode,
        viewer,
        jsonUrl
    );
}
