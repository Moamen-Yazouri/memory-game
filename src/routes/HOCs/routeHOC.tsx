import { ComponentType } from "react";
import { IRouteConfig } from "../types";

const routeHOC = 
<ComponentProps extends object>(config: IRouteConfig) => 
(Component: ComponentType<ComponentProps>) => {
    const {title} = config;
    document.title = title;
    const WrappedComponent = (props: ComponentProps) => {
        return (
            <Component {...props} />
        )
    }
    return WrappedComponent;
}

export default routeHOC;