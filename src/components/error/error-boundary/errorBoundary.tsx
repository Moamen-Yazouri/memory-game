import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Component, ErrorInfo, ReactNode } from "react";
import classes from "./style.module.css";
import ErrorFallback from "../error-fallback/ErrorFallback";

interface IProps{
    children: ReactNode;
}

interface IState{
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component <IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            hasError: false, 
            errorMessage: "",
        };
    }

    static getDerivedStateFromError(error: Error): IState{
        return {
            hasError: true, 
            errorMessage: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        console.error(`Error caught from Error Boundary:  ${error}, ${errorInfo}`);
    }

    handleRetry = () => {
        this.setState({
            hasError: false, 
            errorMessage: "",
        });
    }

    render(){
        if(this.state.hasError){
            return (
                <ErrorFallback handleRetry={this.handleRetry} message={this.state.errorMessage}/>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;