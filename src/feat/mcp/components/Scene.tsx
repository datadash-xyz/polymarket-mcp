import {scenes, type SceneName} from '../scenes.generated';

type SceneProps = {
    name: SceneName;
    className?: string;
};

/**
 * One drawn scene: an HTML mockup of a chat with an assistant that has the Datadash MCP server connected,
 * built from the rows in landing/data/mcp-scenes.json and generated into scenes.generated.ts.
 *
 * The markup is inserted as HTML on purpose. It is generated from the same source as the approved static
 * page, so the two cannot drift, and it is plain markup with no input of any kind: no user or API content
 * reaches it at runtime. Regenerate with `node landing/tools/build-react-mcp.mjs`.
 *
 * The scene carries its own `role="img"` and `aria-label`, so it reads as one picture to a screen reader.
 */
export function Scene({name, className}: SceneProps) {
    // Joined here rather than with `cn`: shared.tsx is a client module, and a server component cannot call its
    // functions under the App Router.
    return (
        <div
            className={['scene-box', className].filter(Boolean).join(' ')}
            dangerouslySetInnerHTML={{__html: scenes[name]}}
        />
    );
}
