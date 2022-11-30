import { createEmotionCache, MantineProvider } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import { Appshell } from "~/lib/matador/components/matador";
import { ClientOnly } from "~/lib/matador/helpers/ui-helpers";

createEmotionCache({ key: "mantine" });

export default function MatadorLayout() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClientOnly>
        <Appshell>
          <main className="flex-1">
            <div className="py-6">
              <Outlet />
            </div>
          </main>
        </Appshell>
      </ClientOnly>
    </MantineProvider>
  );
}
