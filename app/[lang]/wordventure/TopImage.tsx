'use client';

import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';

const animatedSC = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  return (
    <animated.image style={props} height={600}>
      <Image
        src="/screenshots/wv_01.png"
        alt="Word Venture Top"
        width={0}
        height={600}
        style={{ objectFit: 'contain', width: 'auto' }}
      />
    </animated.image>
  );
};

export default animatedSC;
