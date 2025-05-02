import {ReactNode} from 'react'
import {Button} from './Button'
import {Icon} from './Icon'

interface FilterButtonProps {
    label: string
    icon?: ReactNode
    onClick?: () => void
    className?: string
}

export function FilterButton({
                                 label,
                                 icon,
                                 onClick,
                                 className = ""
                             }: FilterButtonProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            className={className}
            onClick={onClick}
            icon={icon}
        >
            {label}
            <Icon id={`${label.toLowerCase()}DropdownIcon`} title="Dropdown">
                <path d="m6 9 6 6 6-6"/>
            </Icon>
        </Button>
    )
}
