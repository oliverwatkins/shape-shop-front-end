import * as React from "react";

/**
 * `ssContext` is a util to create a React Context and
 * a hook for application wide state management.
 */
export function ssContext(contextFactory) {

    const Ctx = React.createContext();

    function CtxProvider(props) {
        const { children, config } = props;
        const ctx = contextFactory(config);
        return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
    }

    function useCtx() {
        const ctx = React.useContext(Ctx);
        if (!ctx) {
            throw new Error(
                `ssContext: this component should be wrapped by a ContextProvider provided by: ssContext(${contextFactory.name}). 
                For more information see: google`
            );
        }
        return ctx;
    }

    return [CtxProvider, useCtx];
}
