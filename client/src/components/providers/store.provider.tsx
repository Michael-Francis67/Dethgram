"use client";
import React, {useRef} from "react";
import {Provider} from "react-redux";
import {store, AppStore} from "@/state/store";

function StoreProvider({children}: {children: React.ReactNode}) {
    const storeRef = useRef<AppStore>(undefined);

    if (storeRef.current === undefined) {
        storeRef.current = store();
    }

    // eslint-disable-next-line react-hooks/refs
    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
