import { Asset, Spacing, Text } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';
import { SafeArea } from '../components/SafeArea';
import { useHangang } from '../hooks/useHangang';
import { useAccessCount } from '../hooks/useAccessCount';
import { formatLastUpdate } from '../api/hangang';
import './IndexPage.css';

const DEFAULT_SPOT = '중랑천';
const SWIM_TEMP_MIN = 22;
const SWIM_TEMP_MAX = 28;

function WaterTempCard() {
  return (
    <div className="page-card">
      <Text color={adaptive.grey600} typography="t6" fontWeight="medium">
        물놀이 적정 수온
      </Text>
      <Spacing size={4} />
      <div className="page-card-value-row">
        <Text color={adaptive.grey900} typography="t3" fontWeight="bold">
          {SWIM_TEMP_MIN}~{SWIM_TEMP_MAX}
        </Text>
        <Text color={adaptive.grey600} typography="t7" fontWeight="medium">
          ℃
        </Text>
      </div>
    </div>
  );
}

function AccessCountCard({ count }: { count: number | null }) {
  return (
    <div className="page-card">
      <Text color={adaptive.grey600} typography="t6" fontWeight="medium">
        오늘 접속
      </Text>
      <Spacing size={4} />
      <div className="page-card-value-row">
        <Text color={adaptive.grey900} typography="t3" fontWeight="bold">
          {count ?? '-'}
        </Text>
        <Text color={adaptive.grey600} typography="t7" fontWeight="medium">
          명
        </Text>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const state = useHangang();
  const accessCount: number | null = useAccessCount();
  const spots = state.status === 'success' ? state.spots : null;
  const spot = spots ? (spots[DEFAULT_SPOT] ?? Object.values(spots)[0]) : null;
  const spotName = spot && spots ? (spots[DEFAULT_SPOT] ? DEFAULT_SPOT : Object.keys(spots)[0]) : DEFAULT_SPOT;

  return (
    <SafeArea>
      <div className="page">
        <div className="page-rows">
          <div className="page-content">
            <div className="page-main">
              <Asset.Image
                frameShape={Asset.frameShape.CleanW100}
                backgroundColor="transparent"
                src="https://static.toss.im/2d-emojis/png/4x/u1F4A7.png"
                aria-hidden
                style={{ aspectRatio: '1/1' }}
              />
              <Spacing size={12} />
              {state.status === 'loading' && (
                <Text color={adaptive.grey700} typography="t2" fontWeight="bold">
                  ...
                </Text>
              )}
              {state.status === 'error' && (
                <>
                  <Text color={adaptive.grey700} typography="t2" fontWeight="bold">
                    —
                  </Text>
                  <Spacing size={12} />
                  <Text color={adaptive.grey600} typography="t7" fontWeight="regular">
                    {state.message}
                  </Text>
                </>
              )}
              {state.status === 'success' && spot && (
                <>
                  <Text color={adaptive.grey700} typography="t2" fontWeight="bold">
                    {spot.TEMP}°C
                  </Text>
                  <Spacing size={12} />
                  <Text color={adaptive.grey700} typography="t7" fontWeight="regular">
                    {formatLastUpdate(spot.LAST_UPDATE, spotName)}
                  </Text>
                </>
              )}
            </div>
            <Spacing size={32} />
            <div className="page-cards">
              <WaterTempCard />
              <AccessCountCard count={accessCount} />
            </div>
          </div>
        </div>
      </div>
    </SafeArea>
  );
}
