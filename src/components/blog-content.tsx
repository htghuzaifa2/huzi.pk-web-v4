"use client";

import { useEffect, useRef, useState } from "react";
import { useLightbox } from "@/context/lightbox-context";
import mermaid from "mermaid";

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openLightbox } = useLightbox();
    const [processedContent, setProcessedContent] = useState(content);

    // Process content to add IDs to headings
    useEffect(() => {
        if (!content) return;

        // Parse HTML and add IDs to headings
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const headings = doc.querySelectorAll("h2, h3, h4");

        headings.forEach((heading, index) => {
            if (!heading.id) {
                const text = heading.textContent?.trim() || "";
                const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .substring(0, 50);
                heading.id = `heading-${slug}-${index}`;
            }
        });

        setProcessedContent(doc.body.innerHTML);
    }, [content]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initialize Mermaid
        const mermaidNodes = container.querySelectorAll('.mermaid');
        if (mermaidNodes.length > 0) {
            mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
            mermaid.run({ nodes: Array.from(mermaidNodes) as HTMLElement[] }).then(() => {
                mermaidNodes.forEach((node) => {
                    const svg = node.querySelector('svg');
                    if (svg) {
                        const svgData = new XMLSerializer().serializeToString(svg);
                        const base64 = btoa(unescape(encodeURIComponent(svgData)));
                        const dataUrl = `data:image/svg+xml;base64,${base64}`;

                        node.addEventListener("click", () => {
                            openLightbox([dataUrl], 0, "Diagram");
                        });
                    }
                });
            });
        }

        const images = container.querySelectorAll("img");
        const imageUrls = Array.from(images).map((img) => img.src);

        const handleImageClick = (index: number) => () => {
            openLightbox(imageUrls, index, "Blog Image");
        };

        images.forEach((img, index) => {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", handleImageClick(index));
        });

        return () => {
            images.forEach((img, index) => {
                img.removeEventListener("click", handleImageClick(index));
            });
        };
    }, [processedContent, openLightbox]);

    return (
        <div
            ref={containerRef}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
        />
    );
}
