abstract class MetaLoopAdvancer {
    abstract shouldAdvance(currentTimeMs: number): boolean;
};

export default MetaLoopAdvancer;