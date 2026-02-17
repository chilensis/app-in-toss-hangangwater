import { colors } from '@toss/tds-colors';

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  return (
    <div
      className="safe-area"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        paddingTop: 'max(env(safe-area-inset-top, 0px), 48px)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 48px)',
        paddingLeft: 'max(env(safe-area-inset-left, 0px), 0px)',
        paddingRight: 'max(env(safe-area-inset-right, 0px), 0px)',
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
