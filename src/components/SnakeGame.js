import React, { useEffect, useRef } from "react";

export default function SnakeGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Prevent Gatsby SSR crash
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return; // safeguard

    const ctx = canvas.getContext("2d");

    let snake = [{ x: 160, y: 160 }];
    let food = { x: 320, y: 320 };
    let dx = 16;
    let dy = 0;

    function draw() {
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, 640, 480);

      ctx.fillStyle = "#64ffda";
      snake.forEach((p) => ctx.fillRect(p.x, p.y, 16, 16));

      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(food.x, food.y, 16, 16);

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        food = {
          x: Math.floor(Math.random() * 40) * 16,
          y: Math.floor(Math.random() * 30) * 16,
        };
      } else {
        snake.pop();
      }

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 640 ||
        head.y >= 480 ||
        snake.slice(1).some((p) => p.x === head.x && p.y === head.y)
      ) {
        snake = [{ x: 160, y: 160 }];
        dx = 16;
        dy = 0;
      }
    }

    function keyHandler(e) {
      if (e.key === "ArrowUp" && dy === 0) (dx = 0), (dy = -16);
      else if (e.key === "ArrowDown" && dy === 0) (dx = 0), (dy = 16);
      else if (e.key === "ArrowLeft" && dx === 0) (dx = -16), (dy = 0);
      else if (e.key === "ArrowRight" && dx === 0) (dx = 16), (dy = 0);
    }

    document.addEventListener("keydown", keyHandler);
    const game = setInterval(draw, 100);

    return () => {
      clearInterval(game);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          border: "2px solid #64ffda",
          borderRadius: "8px",
          background: "#0a192f",
        }}
      />
    </div>
  );
}
