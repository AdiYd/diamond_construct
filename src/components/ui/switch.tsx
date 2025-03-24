import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ checked, onCheckedChange, leftIcon, rightIcon, ...props }, ref) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {leftIcon && (
        <span
          className="switch-icon"
          style={{ color: checked ? 'var(--muted-foreground)' : 'var(--foreground)' }}
        >
          {leftIcon}
        </span>
      )}
      <SwitchPrimitives.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="group relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          style={{
            backgroundColor: checked ? 'var(--primary-foreground)' : 'var(--foreground)',
          }}
        />
      </SwitchPrimitives.Root>
      {rightIcon && (
        <span
          className="switch-icon"
          style={{ color: checked ? 'var(--foreground)' : 'var(--muted-foreground)' }}
        >
          {rightIcon}
        </span>
      )}
    </div>
  )
);

Switch.displayName = 'Switch';
