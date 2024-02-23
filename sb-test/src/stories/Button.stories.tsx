import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { userEvent, within } from "@storybook/test";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    label: "Delete now",
    backgroundColor: "red",
  },
};

export const Custom: Story = {
  args: {
    primary: true,
    label: "自定义渲染",
    backgroundColor: "green",
  },
  render(args, meta) {
    return (
      <div>
        <Button {...args}></Button>
        <p>{meta.loaded.label}</p>
      </div>
    );
  },
  // 组件渲染后的自动执行的操作
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", {
      name: /自定义渲染/i,
    });

    await userEvent.click(btn);

    btn.textContent = "自定义渲染-点击后";

    // 单元测试
    await expect(btn.textContent).toEqual("自定义渲染-点击后");
    await expect(btn.style.backgroundColor).toEqual("blue");
  },
  // 预先执行的操作
  loaders: [
    async () => {
      console.log("预先执行的操作");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        label: "加载后的label",
      };
    },
  ],
};
