export default `
    {{#if src}}
        <img 
            class="avatar-image" 
            width="{{ width }}" 
            height="{{ height }}" 
            src="{{ src }}" 
            alt="{{ alt }}" 
        />
    {{/if}}
`;
