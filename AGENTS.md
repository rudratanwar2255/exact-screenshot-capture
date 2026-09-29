<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Anniversary site
- All user-editable copy, dates and image filenames live in `src/content.ts` so the owner can tweak text without touching components.
- Story sections live in `src/components/sections/*`; `/` is `ssr: false` because R3F Canvas cannot render on the server.
- Missing photos degrade gracefully via `SmartImage`, which shows the expected filename as a placeholder.
