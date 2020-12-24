function handlePathname (e: React.MouseEvent): number[] {
    const target = e.target as HTMLLinkElement;
    const pathname: string = new URL(target.href).pathname;
    const id: number = Number(pathname.match(/\d/ig)?.join(''));
    
    let start = id;
    let end = id + 5;

    return [start, end];
}

export default handlePathname;