export type Portfolio = {
    profile: {
        name: string;
        title: string;
        summary: string;
    },
    sections: Array< {
        id: string;
        type: "text";
        title: string;
        content: string;
    }|{
        id: string;
        type: "list";
        title: string;
        items: string[];
    } >;
};