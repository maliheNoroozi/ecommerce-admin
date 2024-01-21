"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import {
  StoreIcon,
  ChevronsUpDownIcon,
  CheckIcon,
  PlusCircleIcon,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface StoreSwitcherProps {
  stores: Store[];
}

interface FormatedStore {
  value: string;
  label: string;
}

export const StoreSwitcher: FC<StoreSwitcherProps> = ({ stores }) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = useStoreModal((state) => state.onOpen);

  const formattedStores: FormatedStore[] = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId
  );

  const onSelect = (store: FormatedStore) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded="true"
          aria-label="Select a store"
          className="w-[200px] flex items-center justify-start gap-2"
        >
          <StoreIcon size={16} />
          {currentStore?.label}
          <ChevronsUpDownIcon size={16} className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Search store..."
              autoComplete="off"
              className="p-2"
            />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon size={16} className="mr-2" />
                  {store.label}
                  <CheckIcon
                    size={16}
                    className={cn(
                      "ml-auto",
                      currentStore?.value === store.value ? "block" : "hidden"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  onOpen();
                }}
              >
                <PlusCircleIcon size={20} className="mr-2" />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
