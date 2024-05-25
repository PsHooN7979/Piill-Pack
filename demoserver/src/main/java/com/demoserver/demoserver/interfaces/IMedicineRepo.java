package com.demoserver.demoserver.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.MedicineModel;
import java.util.*;

public interface IMedicineRepo extends JpaRepository<MedicineModel, String> {
  List<MedicineModel> findByItemSeqIn(List<String> itemSeqList);

  Optional<MedicineModel> findOneByItemSeq(String itemSeq);
}
