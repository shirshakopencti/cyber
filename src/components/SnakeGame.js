import React, { useEffect, useRef } from "react";

export default function SnakeGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Prevent Gatsby SSR crash
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    /* ----- GAME CONFIG ----- */
    const GRID = 16;
    const WIDTH = 1280;
    const HEIGHT = 800;

    let snake = [{ x: GRID * 10, y: GRID * 10 }];
    let dx = GRID;
    let dy = 0;

    let food = {
      x: Math.floor(Math.random() * (WIDTH / GRID)) * GRID,
      y: Math.floor(Math.random() * (HEIGHT / GRID)) * GRID,
    };

    /* ----- DRAW LOOP ----- */
    function draw() {
      // Background
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Snake
      ctx.fillStyle = "#64ffda";
      snake.forEach((p) => ctx.fillRect(p.x, p.y, GRID, GRID));

      // Food
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(food.x, food.y, GRID, GRID);

      // Next head position
      const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
      };

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        food = {
          x: Math.floor(Math.random() * (WIDTH / GRID)) * GRID,
          y: Math.floor(Math.random() * (HEIGHT / GRID)) * GRID,
        };
      } else {
        snake.pop();
      }

      // Collision: wall or self
      const hitWall =
        head.x < 0 || head.y < 0 || head.x >= WIDTH || head.y >= HEIGHT;

      const hitSelf = snake.slice(1).some((p) => p.x === head.x && p.y === head.y);

      if (hitWall || hitSelf) {
        snake = [{ x: GRID * 10, y: GRID * 10 }];
        dx = GRID;
        dy = 0;
      }
    }

    /* ----- CONTROLS ----- */
    function keyHandler(e) {
      // Stop browser scrolling
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -GRID;
      } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = GRID;
      } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -GRID;
        dy = 0;
      } else if (e.key === "ArrowRight" && dx === 0) {
        dx = GRID;
        dy = 0;
      }
    }

    document.addEventListener("keydown", keyHandler, { passive: false });

    const gameLoop = setInterval(draw, 100);

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <canvas
        ref={canvasRef}
        width={1280}
        height={800}
        style={{
          border: "2px solid #64ffda",
          borderRadius: "8px",
          background: "#0a192f",
        }}
      />
    </div>
  );
}
