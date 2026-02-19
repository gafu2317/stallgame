// src/components/Game/Stage.tsx
import { useEffect, useRef } from 'react';
import { GameInstance } from '../../game/main';

export const Stage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<GameInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = new GameInstance();
    gameRef.current = game;

    let isDestroyed = false;

    const init = async () => {
      await game.init(containerRef.current!);
      
      // もし初期化が終わった瞬間に、すでにコンポーネントがアンマウントされていたら破棄する
      if (isDestroyed) {
        game.destroy();
      }
    };

    init();

    return () => {
      isDestroyed = true;
      // 初期化が完了している場合のみ destroy を呼ぶ（エラー回避）
      if (gameRef.current) {
        try {
          game.destroy();
        } catch (e) {
          console.warn("PixiJS destroy ignored during initialization");
        }
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '800px', height: '600px', background: '#333' }} />;
};