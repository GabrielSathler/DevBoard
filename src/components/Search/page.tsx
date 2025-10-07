import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { SearchIcon } from 'lucide-react'

export function Search() {
    return (
        <><div className="mb-8">
            <InputGroup className="max-w-6xl mx-auto p-4">
                <InputGroupInput placeholder="Digite o nome..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton>Procurar</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div></>

    )
}