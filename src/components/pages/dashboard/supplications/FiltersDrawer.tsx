import { Drawer, DrawerContent, DrawerThumb, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import SupplicationsSidebar from './SupplicationsSidebar';
import React from 'react'
import { SupplicationCategoryId, SupplicationItem, SupplicationTag } from './content';
import { Badge } from '@/components/ui/badge';

type FiltersDrawerProps = {
    isMobileFilterOpen: boolean;
    setIsMobileFilterOpen: (open: boolean) => void;
    clearAllFilters: () => void;
    selectedCategories: Set<SupplicationCategoryId>;
    selectedTags: Set<SupplicationTag>;
    toggleCategory: (category: SupplicationCategoryId) => void;
    toggleTag: (tag: SupplicationTag) => void;
    categoryCounts: Record<string, number>;
    filteredAndSorted: SupplicationItem[];
}

const FiltersDrawer = ({ isMobileFilterOpen,
    setIsMobileFilterOpen, clearAllFilters,
    selectedCategories, selectedTags, toggleCategory,
    toggleTag, categoryCounts, filteredAndSorted
}: FiltersDrawerProps) => {

    const filterCount = selectedCategories.size + selectedTags.size;
    const hasActiveFilters = filterCount > 0;

    return (
        <Drawer open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <DrawerContent className="rounded-t-xl border-none bg-white p-0 overflow-hidden z-[100]">
                <div className="flex flex-col max-h-[92vh] h-max">
                    <DrawerThumb className="mx-auto h-1.5 w-12 bg-gray-100 rounded-full" />
                    {/* Drawer Header - Fixed */}
                    <div className="shrink-0 px-4 py-3">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <DrawerTitle className="text-2xl font-black tracking-tight text-gray-900 uppercase">
                                    Filters
                                </DrawerTitle>
                                {hasActiveFilters && (
                                    <Badge variant="red" className="rounded-full px-2 py-0 h-5 text-[10px] font-black">
                                        {filterCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => { e.preventDefault(); clearAllFilters(); }}
                                className="text-rose-600 font-bold uppercase tracking-widest text-[10px] hover:bg-rose-50"
                                disabled={!hasActiveFilters}
                            >
                                Reset All
                            </Button>
                        </div>
                    </div>

                    {/* Drawer Body - Scrollable Area */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-none overscroll-contain">
                        <div className="pb-8">
                            <SupplicationsSidebar
                                selectedCategories={selectedCategories}
                                onCategoryToggle={toggleCategory}
                                selectedTags={selectedTags}
                                onTagToggle={toggleTag}
                                onClearAll={clearAllFilters}
                                categoryCounts={categoryCounts}
                                hideHeader={true}
                            />
                        </div>
                    </div>

                    {/* Drawer Footer - Sticky Action with Robust Logic */}
                    <div className="shrink-0 p-6 pt-2 bg-gradient-to-t from-white via-white to-white/80 border-t border-gray-50">
                        <Button
                            type="button"
                            className="w-full h-14 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                            onClick={() => setIsMobileFilterOpen(false)}
                            disabled={!hasActiveFilters}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default FiltersDrawer