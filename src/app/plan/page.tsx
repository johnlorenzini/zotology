"use client";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import { useEffect, useState } from "react";

export default function Home() {
    const [planData, setPlanData] = useState<any>(null);

    const authsession = supabase.auth.getSession();
    if (authsession) {
        authsession.then((result) => {
            console.log("Have session");
            console.log(authsession);
            const userId = result.data.session?.user.id;

            if (userId) {
                supabase
                    .from("plans")
                    .select("name, termId, created_at, updated_at, courses")
                    .eq("userId", userId)
                    .eq("name", "current")
                    .then((result) => setPlanData(result));
            }
        });
    }
    return (
        <main>
            <div>{planData ? JSON.stringify(planData, null, 2) : ''}</div>
        </main>
    );
}
